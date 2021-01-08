/**
 * Generate a random ID depending on the length specified 
 * @param {integer} idLength 
 */
function generateId(idLength) {
    let Id = "";
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charLength = characters.length;


    for (let i = 0; i < idLength; i++) {
        id += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return id;
}