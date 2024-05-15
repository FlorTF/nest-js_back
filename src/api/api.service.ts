import { ConflictException, Injectable } from '@nestjs/common';
import axios from 'axios';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sensedia_Data_Queue } from '../sensedia_data_queue/sensedia_data_queue.entity';

@Injectable()
export class ApiService {
  constructor(
    @InjectRepository(Sensedia_Data_Queue)
    private readonly Sensedia_Data_QueueRepository: Repository<Sensedia_Data_Queue>,
  ) {}

  // Función para consumir los datos de la API
  private async consumeData(apiId: number): Promise<any[]> {
    try {
      const headers = {
        'Content-Type': 'application/json',
        'Sensedia-Auth': '126be69a-5c0f-3aba-a912-bd6a4407fd4b',
      };

      const body = {
        apiId: apiId,
      };

      const response = await axios.post(
        'https://manager-gbc.sensedia.com/api-metrics/api/v3/trace/calls',
        body,
        { headers },
      );

      const responseData = response.data;

      /*
      responseData: 
      {"calls": [{},{},{},...,{}],
       "callsSize": 1000,
      }
      */

      if ('calls' in responseData) {
        return responseData.calls;
      } else {
        return [];
      }
    } catch (error) {
      console.error('Error consuming API:', error);
      throw error;
    }
  }

  // Función para guardar los datos en la base de datos
  private async saveData(calls: any[]): Promise<void> {
    try {
      await Promise.all(
        calls.map(async (call: any) => {
          const referenceId = call.id;
          const payload = JSON.stringify(call);

          // Verificar si el referenceId ya existe en la base de datos
          const existingData = await this.Sensedia_Data_QueueRepository.findOne(
            {
              where: { reference_id: referenceId },
            },
          );

          // Si no existe un registro con el mismo reference_id, entonces guardarlo
          if (!existingData) {
            const newCall = this.Sensedia_Data_QueueRepository.create({
              payload: payload,
              reference_id: referenceId,
            });
            await this.Sensedia_Data_QueueRepository.save(newCall);
          }
        }),
      );
    } catch (error) {
      console.error('Error saving data:', error);
      throw error;
    }
  }

  // Función para consumir y guardar los datos de la API
  async consumeAndSaveData(apiIds: number[]): Promise<void> {
    try {
      for (const apiId of apiIds) {
        const calls = await this.consumeData(apiId);
        await this.saveData(calls);
        console.log(calls)
      }
    } catch (error) {
      console.error('Error consuming API or saving data:', error);
      throw error;
    }
  }

  // async consumeAndSaveData(apiIds: number[]): Promise<void> {
  //   try {
  //     const headers = {
  //       'Content-Type': 'application/json',
  //       'Sensedia-Auth': '126be69a-5c0f-3aba-a912-bd6a4407fd4b',
  //     };

  //     for (const apiId of apiIds) {
  //       const body = {
  //         apiId: apiId,
  //       };

  //       const response = await axios.post(
  //         'https://manager-gbc.sensedia.com/api-metrics/api/v3/trace/calls',
  //         body,
  //         { headers },
  //       );

  //       const responseData = response.data;

  //       /*
  //     responseData:
  //     {"calls": [{},{},{},...,{}],
  //      "callsSize": 1000,
  //     }
  //     */
  //       console.log(responseData.calls);

  //       if ('calls' in responseData) {
  //         await Promise.all(
  //           responseData.calls.map(async (call: any) => {
  //             const referenceId = call.id;
  //             const payload = JSON.stringify(call);

  //             // Verificar si el referenceId ya existe en la base de datos
  //             const existingData =
  //               await this.Sensedia_Data_QueueRepository.findOne({
  //                 where: { reference_id: referenceId },
  //               });

  //             // Si no existe un registro con el mismo reference_id, entonces guardarlo
  //             if (!existingData) {
  //               const newCall = this.Sensedia_Data_QueueRepository.create({
  //                 payload: payload,
  //                 reference_id: referenceId,
  //               });
  //               await this.Sensedia_Data_QueueRepository.save(newCall);
  //             }
  //           }),
  //         );
  //       }
  //     }
  //   } catch (error) {
  //     console.error('Error consuming API or saving data:', error);
  //     throw error;
  //   }
  // }
}
