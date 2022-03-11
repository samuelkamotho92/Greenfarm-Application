/* eslint-disable prefer-const */
function makeid(length) {
    let result           = '';
    let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    // eslint-disable-next-line prefer-const
    let charactersLength = characters.length;
    // eslint-disable-next-line no-plusplus
    for ( let i = 0; i < length; i++ ) {
      result +=
     characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}

module.exports = makeid(20);