import { ImageSource, Sound, Resource, Loader } from 'excalibur'

const Resources = {
    Rat: new ImageSource('images/rat.png'),
    Tree: new ImageSource('images/tree.png'),
    BG: new ImageSource('images/bg.png'),
    ThemeSong: new Sound('sounds/Chasing_Cheese.mp3'),
    Cheese: new ImageSource('images/cheese.png'),
    Gun: new ImageSource('images/gun.png'),
}

const resourceArray = []
for (const key in Resources) {
    resourceArray.push(Resources[key])
}

const ResourceLoader = new Loader(resourceArray)

export { Resources, ResourceLoader }