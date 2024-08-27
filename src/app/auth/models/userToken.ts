export class UserToken {
  constructor(
    public _email:string,
    public _id:number,
    public _type:number,
    public _status:number,
    public _token:string,
    private _tokenExpirationDate:Date,
    ){
  }

  get getToken(){

    if(!this._tokenExpirationDate || new Date() > this._tokenExpirationDate){
      return null;
    }
    return this._token;
  }

}
