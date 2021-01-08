/**
 * Generate a random ID depending on the length specified 
 * @param {integer} idLength 
 */
 exports.generateId = function(idLength) {
    let id = "";
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charLength = characters.length;


    for (let i = 0; i < idLength; i++) {
        id += characters.charAt(Math.floor(Math.random() * charLength));
    }

    return id;
}