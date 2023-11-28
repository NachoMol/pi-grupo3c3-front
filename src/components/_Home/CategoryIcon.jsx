/* eslint-disable react/prop-types */
import Sedán from '../../assets/category/sedan-car-model.png'
import Hatchback from '../../assets/category/car-of-hatchback-model.png'
import SUV from '../../assets/category/car.png'
import Pickup from '../../assets/category/pick-up-car.png'
import Coupé from '../../assets/category/sportive-car.png'

const width = '44px';

const CategoryIcon = ({category}) => {
    switch (category) {
        case 'Sedán':
            return (
                <img src={Sedán} alt={Sedán} style={{ maxWidth: `${width}` }} />
            )
        case 'Hatchback':
            return (
                <img src={Hatchback} alt={Hatchback} style={{ maxWidth: `${width}` }} />
            )
        case 'Coupé':
            return (
                <img src={Coupé} alt={Coupé} style={{ maxWidth: `${width}` }} />
            )
        case 'Pickup':
            return (
                <img src={Pickup} alt={Pickup} style={{ maxWidth: `${width}` }} />
            )
        default:
            return (
                <img src={SUV} alt={SUV} style={{ maxWidth: `${width}` }} />
            )
    }
}

export default CategoryIcon