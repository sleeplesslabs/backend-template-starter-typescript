import { v4 as uuidv4 } from 'uuid';
import { BiodataModel } from '../index';


export default class BiodataSeeder {
  async run(){
    const biodatas = [
      {
        // email: fujikawachiai@sleeplesslab.id
        biodataId: uuidv4(),
        authId: "d560140d-f7e0-4d89-b549-6a3ef6ce9b72",
        full_name: "Fujikawa Chiai", 
        phone_number: "080000000000",
      },
      {
        // email: haradakumiko@sleeplesslab.id
        biodataId: uuidv4(),
        authId: "d278093e-823f-446b-be89-72074c2d8c91",
        full_name: "Harada Kumiko", 
        phone_number: "080000000000",
      },
      {
        // email: haranobu@sleeplesslab.id
        biodataId: uuidv4(),
        authId: "f603bc6c-b74e-4fec-9c62-a52ad9a72b49",
        full_name: "Haranobu Arakida", 
        phone_number: "080000000000",
      },
      {
        // email: admin@sleeplesslab.id
        biodataId: uuidv4(),
        authId: "20f5754f-6120-4685-836f-7a1ed77792e8",
        full_name: "Admin Sleeplesslab", 
        phone_number: "080000000000",
      },
    ];

      await BiodataModel.destroy({ where: {} })
      await BiodataModel.bulkCreate(biodatas.map(biodata => ({...biodata })));

  }
} 
