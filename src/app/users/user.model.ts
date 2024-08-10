import { Role } from "../roles/role.model";

export class User {

  constructor(
    public id: number,
    public email: string,
    public roles: Role[] = [],
  ) { }

}