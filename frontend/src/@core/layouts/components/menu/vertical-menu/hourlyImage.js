const getInfoCardBgImage = infoCardBgImagePath => {
    const hourMappings = [
        '17', // 0:00 to 0:59
        '1', // 1:00 to 1:59
        '1', // 2:00 to 2:59
        '1', // 3:00 to 3:59
        '2', // 4:00 to 4:59
        '3', // 5:00 to 5:59
        '4', // 6:00 to 6:59
        '5', // 7:00 to 7:59
        '6', // 8:00 to 8:59
        '7', // 9:00 to 9:59
        '8', // 10:00 to 10:59
        '8', // 11:00 to 11:59
        '9', // 12:00 to 12:59
        '9', // 13:00 to 13:59
        '10', // 14:00 to 14:59
        '11', // 15:00 to 15:59
        '12', // 16:00 to 16:59
        '13', // 17:00 to 17:59
        '14', // 18:00 to 18:59
        '15', // 19:00 to 19:59
        '15', // 20:00 to 20:59
        '16', // 21:00 to 21:59
        '16', // 22:00 to 22:59
        '17' // 23:00 to 23:59
    ]

    const currentHour = new Date().getHours()
    const currentHourImage = hourMappings[currentHour]
    // console.log(currentHour)
    return  `${infoCardBgImagePath}/vcron/card-backgrounds/${currentHourImage}-sm.jpg`
}

export default getInfoCardBgImage