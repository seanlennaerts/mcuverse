import * as BlackPanther from './Black Panther.json';
import * as CaptainMarvel from './Captain Marvel.json';
import * as DoctorStrange from './Doctor Strange.json';
import * as IAntMan from './1 Ant-Man.json';
import * as IAvengers from './1 Avengers.json';
import * as ICaptainAmerica from './1 Captain America.json';
import * as IGuardiansoftheGalaxy from './1 Guardians of the Galaxy.json';
import * as IIronMan from './1 Iron Man.json';
import * as ISpiderMan from './1 Spider-Man.json';
import * as IThor from './1 Thor.json';
import * as IIAntMan from './2 Ant-Man.json';
import * as IIAvengers from './2 Avengers.json';
import * as IICaptainAmerica from './2 Captain America.json';
import * as IIGuardiansoftheGalaxy from './2 Guardians of the Galaxy.json';
import * as IIIronMan from './2 Iron Man.json';
import * as IIThor from './2 Thor.json';
import * as IIIAvengers from './3 Avengers.json';
import * as IIICaptainAmerica from './3 Captain America.json';
import * as IIIIronMan from './3 Iron Man.json';
import * as IIIThor from './3 Thor.json';
import * as IVAvengers from './4 Avengers.json';
import * as TheIncredibleHulk from './The Incredible Hulk.json';

const subs = [
    {   
        id: "blackpanther",
        title: "Black Panther",
        subs: BlackPanther.default
    },
    {   
        id: "captainmarvel",
        title: "Captain Marvel",
        subs: CaptainMarvel.default
    }, 
    {   
        id: "doctorstrange",
        title: "Doctor Strange",
        subs: DoctorStrange.default
    },
    {
        id: "antman1",
        title: "1 Ant-Man",
        subs: IAntMan.default
    },
    {
        id: "avengers1",
        title: "1 Avengers",
        subs: IAvengers.default
    },
    {   
        id: "captainamerica1",
        title: "1 Captain America",
        subs: ICaptainAmerica.default
    },
    {
        id: "guardians1",
        title: "1 Guardians of the Galaxy",
        subs: IGuardiansoftheGalaxy.default
    },
    {
        id: "ironman1",
        title: "1 Iron Man",
        subs: IIronMan.default
    },
    {
        id: "spiderman1",
        title: "1 Spider-Man",
        subs: ISpiderMan.default
    },
    {
        id: "thor1",
        title: "1 Thor",
        subs: IThor.default
    },
    {
        id: "antman2",
        title: "2 Ant-Man",
        subs: IIAntMan.default
    },
    {
        id: "avengers2",
        title: "2 Avengers",
        subs: IIAvengers.default
    },
    {
        id: "captainamerica2",
        title: "2 Captain America",
        subs: IICaptainAmerica.default
    },
    {   
        id: "guardians2",
        title: "2 Guardians of the Galaxy",
        subs: IIGuardiansoftheGalaxy.default
    },
    {
        id: "ironman2",
        title: "2 Iron Man",
        subs: IIIronMan.default
    },
    {
        id: "thor2",
        title: "2 Thor",
        subs: IIThor.default
    },
    {
        id: "avengers3",
        title: "3 Avengers",
        subs: IIIAvengers.default
    },
    {
        id: "captainamerica3",
        title: "3 Captain America",
        subs: IIICaptainAmerica.default
    },
    {
        id: "ironman3",
        title: "3 Iron Man",
        subs: IIIIronMan.default
    },
    {
        id: "thor3",
        title: "3 Thor",
        subs: IIIThor.default
    },
    {   
        id: "avengers4",
        title: "4 Avengers",
        subs: IVAvengers.default
    },
    {
        id: "hulk",
        title: "The Incredible Hulk",
        subs: TheIncredibleHulk.default
    }
];

export default subs;
