export const convertStringToNumber = (str) => {
    if (!str) return 0;
    if (str.includes('-')) {
        return Number(str.split('-').join(''));
    }
    return Number(str.split(',').join(''));
}

export const findMaxFeaturedShipNames = (ships) => {
    let max = 0;
    for (let i = 0; i < ships.length; i++) {
        if (ships[i].films.length > max) {
            max = ships[i].films.length;
        }
    }

    const shipNames = ships.filter(ship => ship.films.length === max).map(ship => ship.name);
    return shipNames;
}