# Acoustics Principles

This app calculates commonly used acoustic parameters (parameters that can be calculated or approximated without ray tracing) for a closed hall.

## Usage

1. **Draw the Floor Plan**: Click to create corner points and shape the polygon. You can drag points to adjust the shape.

2. **Place Listener and Source Points**: Position these points as needed.

3. **Set Ceiling Height**: Enter the ceiling height property (default is 10 meters).

4. **Adjust Drawing Board Scale**: Use the scale multiplier at the top of the drawing board to increase or decrease the scale.

5. **Remove Points**: Select 'Remove Points' and click on the point you wish to delete.

6. **Reset All Points**: Click the 'Reset' button to clear all points.

7. **Modify Points**: Enter coordinates and adjust points using the input fields on the right side of the page.

8. **Change Materials**:
   All materials and absorbtion coefficient data is taken from;
   Hall, Donald E., Musical Acoustics, 2nd Ed, Brooks/Cole Publishing, 1991. Table 15.1

   - **Ceiling and Floor Materials**: Modify these in the top-right section of the page to affect diffusion.
   - **Wall Materials**: Adjust these in the right section of the page. Labels indicate the segments by their start and end points.

9. **Calculate**: Once all parameters are set, click the 'Calculate' button.

## Results

The results include:

- **Se (Effective Absorbent Area)**: The effective area of the absorbent surfaces.

- **RT60**: The time it takes for the sound level to drop by 60 dB, accounting for various absorptive materials.
  Formula - Beranek and Mellow, Acoustics - Sound Fields and Transducers (10.50)
  ![Local Image](/src/formulaAssets/rt60Sabine.png)

- **RT60 Avg Absorption**: A modified RT60 calculated by dividing the total absorption coefficients by the total area, representing the effective absorbent area rather than calculating each surface's area individually.

- **Aavg**: The average absorbent area used to calculate RT60 Avg Absorption.

- **G (Sound Strength)**: The sound strength in decibels, representing the ratio of sound energy from a nondirectional source measured at a distance \( r \) in the auditorium, compared to the same sound energy measured in an anechoic chamber at \( r = 10 \) meters.

Formula - Beranek and Mellow, Acoustics - Sound Fields and Transducers (10.65)
![Local Image](/src/formulaAssets/soundStrength.png)

- **Eearly**: The sound level arriving within 80 ms of the direct sound.

Formula - Beranek and Mellow, Acoustics - Sound Fields and Transducers (10.66)
![Local Image](/src/formulaAssets/Eearly.png)

- **Ereverberant**: The sound level arriving after 80 ms of the direct sound.

Formula - Beranek and Mellow, Acoustics - Sound Fields and Transducers (10.67)
![Local Image](/src/formulaAssets/Ereverberant.png)

- **C80 (Clarity)**: The ratio of early sound energy (before 80 ms) to late sound energy (after 80 ms).

- **Gmin**: The minimum sound strength based on sampling real concert halls, representing the lowest G value the hall could provide.

- **Initial Time Delay**: The time gap between the direct sound and the first reflected sound reaching the listener.

- **Earliest Reflection Time**: The time elapsed until the first reflection reaches the listener.

- **Intensity Percent**: The percentage of direct sound level that reaches the listener from the source point.
  Formula - Beranek and Mellow, Acoustics - Sound Fields and Transducers (1.15)
  ![Local Image](/src/formulaAssets/Ereverberant.png)
