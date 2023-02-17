import {  useEffect } from 'react'
import p5 from 'p5';

import { StyledWaveform } from './liveWaveformStyles';

export default function LiveWaveform(analyser) {
    useEffect(() => {
      analyser = analyser.analyser;
      if (!analyser) return;
      const s = (sketch) => {
        let x = 500;
        let y = 140;

        sketch.setup = () => {
          sketch.createCanvas(x, y);
        };

        sketch.draw = () => {
          sketch.background('#1f324d');
          sketch.noFill();
          const values = analyser.getValue();
          sketch.beginShape();
          
          for (let i=0; i<values.length; i++) {
            const amplitude = values[i];
            const x = sketch.map(i, 0, values.length - 1, 0, sketch.width);
            const y = sketch.height / 3 + amplitude * sketch.height * 3;
            sketch.vertex(x, y);
          } 
          sketch.endShape();
        };
      };
      let wavep5 = new p5(s, 'waveform');
      return () => wavep5.remove();
    }, []);

    return (
        <StyledWaveform id="waveform">
        </StyledWaveform>
    );
  }