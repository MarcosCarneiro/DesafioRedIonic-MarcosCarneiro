export class User {
  private id: number;
  private name: string;
  private age: number;
  private city: string;
  private email: string;
  private picture: string;

  //getters
  getId(){
    return this.id;
  }

  getName(){
    return this.name;
  }

  getAge(){
    return this.age;
  }

  getCity(){
    return this.city;
  }

  getEmail(){
    return this.email;
  }

  getPicture(){
    return this.picture;
  }


  //setters
  setId(id: number){
    this.id = id;
  }

  setName(name: string){
    this.name = name;
  }

  setAge(age: number){
    this.age = age;
  }

  setCity(city: string){
    this.city = city;
  }

  setEmail(email: string){
    this.email = email;
  }

  setPicture(picture: string){
    this.picture = picture;
  }

}
