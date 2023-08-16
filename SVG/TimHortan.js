import * as React from "react"
import Svg, { Path, Defs, Pattern, Use, Image } from "react-native-svg"
function TimHortan(props) {
  return (
    <Svg
      width={180}
      height={160}
      viewBox="0 0 184 177"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...props}
    >
      <Path
        d="M0 20C0 8.954 8.954 0 20 0h144c11.046 0 20 8.954 20 20v137c0 11.046-8.954 20-20 20H20c-11.046 0-20-8.954-20-20V20z"
        fill="url(#pattern0)"
      />
      <Defs>
        <Pattern
          id="pattern0"
          patternContentUnits="objectBoundingBox"
          width={1}
          height={1}
        >
          <Use
            xlinkHref="#image0_1_667"
            transform="matrix(.00175 0 0 .00182 -.524 0)"
          />
        </Pattern>
        <Image
          id="image0_1_667"
          width={900}
          height={550}
        />
      </Defs>
    </Svg>
  )
}
export default TimHortan;