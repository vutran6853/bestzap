import star_1 from './small_1.png';
import star_1_half from './small_1_half.png'
import star_2 from './small_2.png';
import star_2_half from './small_2_half.png'
import star_3 from './small_3.png';
import star_3_half from './small_3_half.png'
import star_4  from './small_4.png';
import star_4_half from './small_4_half.png';
import star_5 from './small_5.png';

export default function rateImage(rating) {

    if(rating === 0) {

    } else if (rating === 1) {
      return star_1
    } 
    else if (rating === 1.5) {
      return star_1_half
    } 
    else if (rating === 2) {
      return star_2
    } 
    else if (rating === 2.5) {
      return star_2_half
    } 
    else if (rating === 3) {
      return star_3
    } 
    else if (rating === 3.5) {
      return star_3_half
    } 
    else if (rating === 4) {
      return star_4 
    } 
    else if (rating === 4.5) {
      return star_4_half 
    } 
    else if (rating === 5) {
      return star_5
    }

  }
