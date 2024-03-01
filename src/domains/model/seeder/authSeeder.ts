import { v4 as uuidv4 } from 'uuid';
import { AuthModel } from '../index';


export default class AuthSeeder {
  async run(){
    const auths = [
      {
        authId: "d560140d-f7e0-4d89-b549-6a3ef6ce9b72",
        email: "fujikawachiai@sleeplesslab.id", 
        status: "active",
        roles: "member"
      },
      {
        authId: "d278093e-823f-446b-be89-72074c2d8c91",
        email: "haradakumiko@sleeplesslab.id", 
        status: "active",
        roles: "member"
      },
      {
        authId: "f603bc6c-b74e-4fec-9c62-a52ad9a72b49",
        email: "haranobuarakida@sleeplesslab.id", 
        status: "inactive",
        roles: "member"
      },
      {
        authId: "20f5754f-6120-4685-836f-7a1ed77792e8",
        email: "admin@sleeplesslab.id", 
        status: "active",
        roles: "admin"
      }
    ];

      await AuthModel.destroy({ where: {} })
      await AuthModel.bulkCreate(auths.map(auth => ({...auth })));

  }
} 
