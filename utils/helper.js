 class helper {

     constructor(str) {
         this.str = str;
     }
     get Case() {
         return this.titleCase()
     }
     titleCase() {
         const splitStr = this.str.toLowerCase().split(' ');
         for (let i = 0; i < splitStr.length; i++) {
             splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
         }
         return splitStr.join(' ');
     };
 };

 module.exports = helper;