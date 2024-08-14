export class UserToken {
  constructor(
    public _id:string,
    public _token:string,
    private _tokenExpirationDate:Date,
    public _email?:string,
    public _isAdmin?:boolean,
    // public _role?:string[],
    ){
  }

  get getToken(){

    if(!this._tokenExpirationDate || new Date() > this._tokenExpirationDate){
      return null;
    }
    return this._token;
  }

}
