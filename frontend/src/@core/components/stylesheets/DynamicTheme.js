// ** React Imports
import React, { useEffect } from 'react'

// ** Store & Actions
import { useSelector } from 'react-redux'

const DynamicTheme = () => {
    const { appliedTheme, wallpaperCounter } = useSelector((state) => state.layout)

    const themeRoot = '/assets/css/themes/'

    useEffect(() => {
        // Dynamically setting the background image
        const imagePath = `${themeRoot}${appliedTheme}/vista/${wallpaperCounter}.jpg`
        const preloadImage = new Image()
        preloadImage.src = imagePath

        preloadImage.onload = () => {
            document.body.style.background = `url('${imagePath}') center center / cover no-repeat fixed`
        }
      
    }, [appliedTheme, wallpaperCounter])

    return (
        <>
            <link rel='stylesheet' type='text/css' href={`${themeRoot}${appliedTheme}/${appliedTheme}.css`} />
            <link rel='stylesheet' type='text/css' href={`${themeRoot}vcrontheme.rev2.2.css`} />
            <link rel='stylesheet' type='text/css' href='/assets/css/site.css' />
        </>
    )
}

export default DynamicTheme
