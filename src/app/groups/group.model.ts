export class Group {

  constructor(
    public id: number,
    public name: string,
    public collection?: {
      id: number,
      name: string,
    }[],
  ) { }
}
