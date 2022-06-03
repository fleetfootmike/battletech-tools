
import React from 'react';

export default class BipedRearArmorDiagramSVG extends React.Component<IBipedRearArmorDiagramSVGProps, IBipedRearArmorDiagramSVGState> {
    bgColor = "rgb(255,255,255)";
    strokeColor = "rgb(0,0,0)";
    theWidth = 744;
    theHeight = 627;
    xLoc = 0;
    yLoc = 0;
    baseWidth = 744.09448819;
    baseHeight = 1052.3622047;
    constructor(props: IBipedRearArmorDiagramSVGProps) {
        super(props);
        this.state = {
        }
        if( this.props.bgColor ) {
            this.bgColor = this.props.bgColor;
        }
        if( this.props.strokeColor ) {
            this.strokeColor = this.props.strokeColor;
        }

        if( this.props.width ) {
            this.theWidth = this.props.width;
            this.theHeight = Math.round( this.props.width / this.baseWidth * this.baseHeight );

        }

        if( this.props.xLoc  ) {
            this.xLoc = this.props.xLoc;
        }

        if( this.props.yLoc ) {
            this.yLoc = this.props.yLoc;
        }

        // if( typeof(standAlone) === "undefined" )
        //     standAlone = true;

        // if( !baseFillColor )
        //     baseFillColor = colorTan;

        // if( !lineColor )
        //     lineColor = colorGold;
    }

    render = (): JSX.Element => {

        // var svg = "";

        // if( standAlone ) {
        //     var svg = "<!DOCTYPE HTML><svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xml:space=\"preserve\" height=\"" + theHeight  + " px\" width=\"" + theWidth  + "px\" viewBox=\"0 0 790 100\" ><g>\n";

        return (
            <svg
                viewBox={"0 0 " + this.baseWidth + " " + this.baseHeight}
                y={this.yLoc}
                x={this.xLoc}
                width={this.theWidth}
                height={this.theHeight}
                id="rearArmorDiagram"
                version="1.1"
            >
                  <g>
                      <g
                        transform="translate(0,-425.19712)"
                        id="rearArmorLayer1"
                      >
                          <path
                            id="path4740"
                            d="m 255.33564,1031.6854 c -12.9661,-14.8304 -22.468,-46.09741 -27.9139,-91.8529 l -2.6212,-22.02381 -12.7648,-1.44555 c -7.0206,-0.79506 -41.04523,-3.22678 -75.6103,-5.40381 l -62.845597,-3.95823 -7.12187,-6.74437 -7.12187,-6.74435 -5.10557,-107.8816 c -6.92551,-146.33745 -7.22688,-134.81631 3.84136,-146.85188 l 9.05806,-9.84969 96.974497,-4.90314 c 53.33599,-2.6967 100.33129,-5.09167 104.43409,-5.32214 l 7.4596,-0.41902 0.599,-25.70992 0.5991,-25.70991 7.4675,-6.7752 c 4.1071,-3.72636 8.8165,-6.77521 10.4653,-6.77521 1.6488,0 6.1711,-6.16748 10.0496,-13.70552 3.8784,-7.53804 12.699,-19.67628 19.6013,-26.97387 11.6697,-12.33812 12.6537,-14.18096 14.0348,-26.28546 1.2369,-10.83937 2.6195,-14.06423 8.2644,-19.27612 6.4699,-5.97368 7.73,-6.25902 27.6403,-6.25902 20.744,0 20.899,0.0403 27.545,7.15774 5.1647,5.53093 7.0234,9.91079 8.1784,19.27083 1.1974,9.70396 3.0584,13.88407 9.3567,21.01754 6.944,7.86481 21.3749,35.15322 21.3749,40.41937 0,2.47056 5.328,4.63451 11.4109,4.63451 2.5676,0 8.2437,3.04537 12.6136,6.76749 l 7.9451,6.76748 0,25.16704 c 0,13.84187 0.2398,25.17714 0.5329,25.1895 0.293,0.0123 23.5509,1.43793 51.6842,3.16793 28.1332,1.73001 75.1165,4.40934 104.4072,5.95407 l 53.2559,2.80858 8.0508,8.88956 c 4.4279,4.88924 8.5787,10.94903 9.2239,13.46617 0.6453,2.51717 -1.2485,56.24401 -4.2083,119.393 -4.9165,104.89636 -5.7578,115.57854 -9.7369,123.6384 -2.3955,4.85213 -6.0307,9.7134 -8.0783,10.80283 -2.0475,1.08943 -15.2319,2.62563 -29.2985,3.4138 -36.6161,2.05161 -119.2331,8.27694 -120.0095,9.04293 -0.3609,0.35608 -1.9888,11.13744 -3.6173,23.95856 -5.6384,44.38766 -15.8434,74.65309 -30.3601,90.03989 l -7.7919,8.259 -112.2788,0 -112.2787,0 -7.305,-8.3555 z m 234.5983,-8.1921 c 14.0048,-16.4826 22.9913,-45.92567 27.7115,-90.79356 4.4,-41.82414 -13.1726,-88.81453 -41.7376,-111.60959 l -11.2728,-8.99574 -0.01,-120.42049 -0.01,-120.4205 -5.2543,-4.27092 c -2.8899,-2.34901 -9.124,-4.91033 -13.8535,-5.69183 -8.1384,-1.34477 -8.5992,-1.83256 -8.5992,-9.10321 0,-5.32169 -0.9713,-7.68231 -3.161,-7.68231 -1.7386,0 -5.6728,-5.20312 -8.7427,-11.5625 -3.0698,-6.35937 -9.2011,-15.52678 -13.625,-20.37202 -6.6251,-7.25605 -8.2672,-10.90862 -9.3122,-20.71324 -1.9836,-18.61152 -6.55,-22.23319 -28.0326,-22.23319 -21.5711,0 -25.4651,3.22501 -27.28,22.59293 -1.1218,11.97133 -1.8435,13.30092 -12.8758,23.72004 -7.7287,7.29916 -14.4489,16.58123 -19.8404,27.40384 -6.0678,12.18017 -9.5225,16.71689 -13.5076,17.73786 -2.9451,0.75452 -7.5126,3.45328 -10.1501,5.99726 l -4.7954,4.6254 0,118.50137 0,118.50134 -15.669,16.01056 c -17.5261,17.90833 -26.6709,34.8829 -32.4743,60.27941 -8.4733,37.07972 5.5699,119.97679 23.7583,140.24629 l 5.3757,5.9908 108.3897,0 108.3896,0 6.5749,-7.738 z M 225.94384,901.84143 c 0.059,-11.33742 6.5273,-34.57934 14.2413,-51.17194 5.4916,-11.81232 11.8727,-20.87293 22.2867,-31.64518 l 14.5919,-15.0939 0,-88.21531 0,-88.21528 -39.962,1.56818 c -42.18887,1.6556 -105.41247,4.94946 -144.103437,7.50761 -23.10572,1.52768 -23.16395,1.54588 -29.30548,9.15587 -7.49621,9.28856 -7.4203,-1.49682 -0.9514,135.18804 4.84031,102.27358 5.31078,107.81658 9.54643,112.47558 4.18928,4.608 7.4124,5.07314 53.997007,7.7928 27.24798,1.59075 57.21449,3.60172 66.59225,4.4688 32.91573,3.04345 33.03113,3.03013 33.06673,-3.81527 z m 346.306,2.89404 c 22.2722,-1.70542 53.7687,-3.79796 69.9923,-4.65013 25.8381,-1.35717 30.1226,-2.12986 34.5366,-6.22849 5.0391,-4.67909 5.0392,-4.67984 10.4395,-122.10611 l 5.4003,-117.42698 -5.836,-7.62614 c -3.2098,-4.19437 -7.7541,-8.01268 -10.0986,-8.48513 -7.9218,-1.59644 -165.4225,-9.96763 -188.0879,-9.99692 l -15.452,-0.0199 0,88.20154 0,88.20156 14.6176,14.89666 c 16.8989,17.22163 30.1305,42.23341 35.6977,67.47998 4.4629,20.23843 4.6817,20.92788 6.6303,20.89172 0.916,-0.0176 19.8881,-1.42622 42.1602,-3.13161 z"
                            style={{fill: this.strokeColor}}
                           >
                           </path>
                        </g>
                    </g>
                </svg>
      );
    }
}

interface IBipedRearArmorDiagramSVGProps {
    bgColor?: string;
    strokeColor?: string;

    yLoc?: number;
    xLoc?: number;

    width?: number;
}

interface IBipedRearArmorDiagramSVGState {
}