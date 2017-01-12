export class User {
  private name: string;
  private email: string;
  private gender: string;
  private age: number;
  private city: string;
  private picture: string;

  //getters
  getName(){
    return this.name;
  }

  getEmail(){
    return this.email;
  }

  getGender(){
    return this.gender;
  }

  getAge(){
    return this.age;
  }

  getCity(){
    return this.city;
  }

  getPicture(){
    return this.picture;
  }


  //setters
  setName(name: string){
    this.name = name;
  }

  setEmail(email: string){
    this.email = email;
  }

  setGender(gender: string){
    this.gender = gender;
  }

  setAge(age: number){
    this.age = age;
  }

  setCity(city: string){
    this.city = city;
  }

  setPicture(picture: string){
    this.picture = picture;
  }

}
