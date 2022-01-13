/* eslint-disable node/no-unsupported-features/es-syntax */
/* eslint-disable prefer-const */
class QueryOperations {
constructor(query,queryString){
this.query = query;
this.queryStg = queryString
}

filter(){
//create a shallow copy of initial querystring
let queryStrg= {...this.querySg}
let excludeValue = ["page","limit","sort","fields"];
excludeValue.forEach(name=>{
    delete queryStrg[name]
})
let objectValue = JSON.stringify(queryStrg);
objectValue =  objectValue.replace(/\b(gte|gt|lte|lt)\b/gi,match=>`$${match}`);
this.query = this.query.find(JSON.parse(objectValue));
return this
}

sort(){
if(this.queryStg.sort){
    const sortBy = this.queryStg.sort(",").join(" ")
    this.query = this.query.sort(sortBy);
}
return this

}

limitFields(){
    if(this.queryStg.fields){
        const fields = this.queryStg.fields.split(",").join(" ");
        this.query = this.query.select(fields);
            }else{
                this.query = this.query.select("-__v");
            }
            return this
}

pagination(){
    const page = this.querStg.page * 1 || 1;
    const limit = this.querStg.limit * 1|| 100;
    const skipped = (page-1)*limit;
    this.query = this.query.skip(skipped).limit(limit);
  return this
}
}
module.exports = QueryOperations;