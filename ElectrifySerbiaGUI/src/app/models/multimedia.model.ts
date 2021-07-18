export class Multimedia {
  id: number = 0;
  //file : File = new File([],'');
  url: string = '';
  constructor(id: number, file: File, url: string) {
    this.id = id;
    //this.file = file;
    this.url = url;
  }
}
