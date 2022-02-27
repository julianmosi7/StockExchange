import { DepotDto } from "./depotDto";

export class UserDto{
    id: number;
    name: string;
    cash: number;
    depots: DepotDto[];
}