import anaPortrait from '../resources/ana.png';
import bastionPortrait from '../resources/bastion.png';
import brigittePortrait from '../resources/brigitte.png';
import doomfistPortrait from '../resources/doomfist.png';
import dvaPortrait from '../resources/dva.png';
import genjiPortrait from '../resources/genji.png';
import hanzoPortrait from '../resources/hanzo.png';
import junkratPortrait from '../resources/junkrat.png';
import lucioPortrait from '../resources/lucio.png';
import mccreePortrait from '../resources/mccree.png';
import meiPortrait from '../resources/mei.png';
import mercyPortrait from '../resources/mercy.png';
import orisaPortrait from '../resources/orisa.png';
import pharahPortrait from '../resources/pharah.png';
import reaperPortrait from '../resources/reaper.png';
import reinhardtPortrait from '../resources/reinhardt.png';
import roadhogPortrait from '../resources/roadhog.png';
import soldier76Portrait from '../resources/soldier76.png';
import sombraPortrait from '../resources/sombra.png';
import symmetraPortrait from '../resources/symmetra.png';
import torbjornPortrait from '../resources/torbjorn.png';
import tracerPortrait from '../resources/tracer.png';
import widowmakerPortrait from '../resources/widowmaker.png';
import winstonPortrait from '../resources/winston.png';
import wreckingballPortrait from '../resources/wreckingball.png';
import zaryaPortrait from '../resources/zarya.png';
import zenyattaPortrait from '../resources/zenyatta.png';

const heroPortraits = {
    Ana: anaPortrait,
    Ashe: widowmakerPortrait,
    Baptiste: mercyPortrait,
    Bastion: bastionPortrait, 
    Brigitte: brigittePortrait,
    DVa: dvaPortrait,
    Doomfist: doomfistPortrait,
    Genji: genjiPortrait,
    Hanzo: hanzoPortrait,
    Junkrat: junkratPortrait,
    Lucio: lucioPortrait,
    Mccree: mccreePortrait,
    Mei: meiPortrait,
    Mercy: mercyPortrait,
    Orisa: orisaPortrait,
    Pharah: pharahPortrait,
    Reaper: reaperPortrait,
    Reinhardt: reinhardtPortrait,
    Roadhog: roadhogPortrait,
    Soldier76: soldier76Portrait,
    Sombra: sombraPortrait,
    Symmetra: symmetraPortrait,
    Torbjorn: torbjornPortrait,
    Tracer: tracerPortrait,
    Widowmaker: widowmakerPortrait,
    Winston: winstonPortrait,
    WreckingBall: wreckingballPortrait,
    Zarya: zaryaPortrait,
    Zenyatta: zenyattaPortrait
}

export function getHeroPortrait(heroKey) {
    return heroPortraits[heroKey];
}