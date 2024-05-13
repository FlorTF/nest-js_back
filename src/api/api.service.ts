import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sensedia_Data_Queue } from '../sensedia_data_queue/sensedia_data_queue.entity';



@Injectable()
export class ApiService {
  constructor(
    @InjectRepository(Sensedia_Data_Queue)
    private readonly sensediaDataQueueRepository: Repository<Sensedia_Data_Queue>,
  ) {}

  async consumeAndSaveData(): Promise<void> {
    try {
      const headers = {
        'Content-Type': 'application/json',
        'Sensedia-Auth': '126be69a-5c0f-3aba-a912-bd6a4407fd4b',
      };
      const body = {
        apiId: 49,
      };

      const response = await axios.post(
        'https://manager-gbc.sensedia.com/api-metrics/api/v3/trace/calls',
        body,
        { headers },
      );
      
      const responseData = response.data;
      /*
      {"calls": [{},{},{},...,{}],
       "callsSize": 1000,
      }
      */
      console.log(responseData.calls)

      // Extraer el valor de la clave 'id' del objeto JSON
      //const referenceId = responseData.calls;
      
      


      // Crear una nueva instancia de SensediaDataQueue con el valor de referenceId
    //   const newData = this.sensediaDataQueueRepository.create({
    //     payload: JSON.stringify(responseData),
    //     //reference_id: referenceId, // Asignar el valor de referenceId al campo reference_id
    //   });

      // Guardar los datos en la base de datos
      //await this.sensediaDataQueueRepository.save(newData);
    } catch (error) {
      console.error('Error consuming API or saving data:', error);
      throw error;
    }
  }
}