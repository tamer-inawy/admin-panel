import { Group } from "../groups/group.model";
import { Roles } from "./roles.enum";

export class Role {
  constructor(
    public role: Roles,
    public id?: number,
    public group?: Group,
  ) { }
}
