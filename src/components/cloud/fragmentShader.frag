uniform float u_mouseX;
uniform float u_mouseY;
// float n_ = u_mouseX- u_mouseY;
// uniform float u_time;
// void main() {
// 	gl_FragColor = vec4(1,1,1,abs(sin(u_time)));
// }
// precision mediump float;


// uniform vec2 u_res;
// uniform float u_time;
//
//
// #define PI 3.14159265358979323846
//
// vec2 rotate2D (vec2 _st, float _angle) {
//     _st -= 0.5;
//     _st =  mat2(cos(_angle),-sin(_angle),
//                 sin(_angle),cos(_angle)) * _st;
//     _st += 0.5;
//     return _st;
// }
//
// vec2 tile (vec2 _st, float _zoom) {
//     _st *= _zoom;
//     return fract(_st);
// }
//
// vec2 rotateTilePattern(vec2 _st){
//
//     //  Scale the coordinate system by 2x2
//     _st *= 2.0;
//
//     //  Give each cell an index number
//     //  according to its position
//     float index = 0.0;
//     index += step(1., mod(_st.x,2.0));
//     index += step(1., mod(_st.y,2.0))*2.0;
//
//     //      |
//     //  2   |   3
//     //      |
//     //--------------
//     //      |
//     //  0   |   1
//     //      |
//
//     // Make each cell between 0.0 - 1.0
//     _st = fract(_st);
//
//     // Rotate each cell according to the index
//     if(index == 1.0){
//         //  Rotate cell 1 by 90 degrees
//         _st = rotate2D(_st,PI*0.5);
//     } else if(index == 2.0){
//         //  Rotate cell 2 by -90 degrees
//         _st = rotate2D(_st,PI*-0.5);
//     } else if(index == 3.0){
//         //  Rotate cell 3 by 180 degrees
//         _st = rotate2D(_st,PI);
//     }
//
//     return _st;
// }
//
// void main (void) {
//     vec2 st = gl_FragCoord.xy/u_res.xy;
//
//     st = tile(st,3.0);
//     st = rotateTilePattern(st);
//
//     // Make more interesting combinations
//     st = tile(st,4.0);
//     st = rotate2D(st,-PI*u_time*0.15);
//     st = rotateTilePattern(st*0.20);
//     st = rotate2D(st,PI*u_time*0.25);
//
//     // step(st.x,st.y) just makes a b&w triangles
//     // but you can use whatever design you want.
//     gl_FragColor = vec4(vec3(step(st.x,st.y)),abs(sin(u_time)));
// }

// uniform vec2 u_res;
// uniform vec2 u_mouse;
// uniform float u_time;
//
// void main() {
//     vec2 st = gl_FragCoord.xy/u_res.xy;
//     st.x *= u_res.x/u_res.y;
//
//     vec3 color = vec3(.0);
//
//     // Cell positions
//     vec2 point[5];
//     point[0] = vec2(0.83,0.75);
//     point[1] = vec2(0.60,0.07);
//     point[2] = vec2(0.28,0.64);
//     point[3] =  vec2(0.31,0.26);
//     point[4] = u_mouseX/u_res;
//
//     float m_dist = 1.;  // minimun distance
//
//     // Iterate through the points positions
//     for (int i = 0; i < 5; i++) {
//         float dist = distance(st, point[i]);
//
//         // Keep the closer distance
//         m_dist = min(m_dist, dist);
//     }
//
//     // Draw the min distance (distance field)
//     color += m_dist;
//
//     // Show isolines
//     color -= step(.7,abs(sin(50.0*m_dist)))*.3;
//
//     gl_FragColor = vec4(color,1);
// }




// uniform vec2 u_res;
// uniform vec2 u_mouse;
// uniform float u_time;
//
// vec2 random2( vec2 p ) {
//     return fract(sin(vec2(dot(p,vec2(127.1,311.7)),dot(p,vec2(29.5,183.3))))*93758.5453);
// }
//
// void main() {
//     vec2 st = gl_FragCoord.xy/u_res.xy;
//     st.x *= u_res.x/u_res.y;
//     vec3 color = vec3(.0);
//
//     // Scale
//     st *= abs(cos(u_time));
//
//     // Tile the space
//     vec2 i_st = floor(st);
//     vec2 f_st = fract(st);
//
//     float m_dist = 3.;  // minimun distance
//
//     for (int y= -1; y <= 1; y++) {
//         for (int x= -1; x <= 1; x++) {
//             // Neighbor place in the grid
//             vec2 neighbor = vec2(float(x),float(y));
//
//             // Random position from current + neighbor place in the grid
//             vec2 point = random2(i_st + neighbor);
//
// 			// Animate the point
//             point = 0.5 + 0.5*sin(u_time + 6.2831*point);
//
// 			// Vector between the pixel and the point
//             vec2 diff = neighbor + point - f_st;
//
//             // Distance to the point
//             float dist = length(diff);
//
//             // Keep the closer distance
//             m_dist = min(m_dist, dist);
//         }
//     }
//
//     // Draw the min distance (distance field)
//     color += m_dist;
//
//     // Draw cell center
//     // color += 1.-step(.02, m_dist);
//
//     // Draw grid
//     color.g += step(.28, f_st.x) + step(.48, f_st.y);
//
//     color.b += step(.78, f_st.y) +0.2+ step(abs(cos(u_time)), f_st.y);
//
//       color.r += step(.98, f_st.x) + step(abs(sin(u_time)), f_st.y);
//
//     // Show isolines
//     // color -= step(.7,abs(sin(27.0*m_dist)))*.5;
//
//     gl_FragColor = vec4(color,abs(sin(u_time)));
// }

uniform vec2 u_res;
uniform vec2 u_mouse;
uniform float u_time;

float random (in vec2 _st) {
    return fract(sin(dot(_st.xy,
                         vec2(12.9898,78.233)))*
        43758.5453123);
}

// Based on Morgan McGuire @morgan3d
// https://www.shadertoy.com/view/4dS3Wd
float noise (in vec2 _st) {
    vec2 i = floor(_st);
    vec2 f = fract(_st);

    // Four corners in 2D of a tile
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));

    vec2 u = f * f * (3.0 - 2.0 * f);

    return mix(a, b, u.x) +
            (c - a)* u.y * (1.0 - u.x) +
            (d - b) * u.x * u.y;
}

#define NUM_OCTAVES 2

float fbm ( in vec2 _st) {
    float v = 0.0;
    float a = 0.5;
    vec2 shift = vec2(100.0);
    // Rotate to reduce axial bias
    mat2 rot = mat2(cos(0.5), sin(0.5),
                    -sin(0.5), cos(0.50));
    for (int i = 0; i < NUM_OCTAVES; ++i) {
        v += a * noise(_st);
        _st = rot * _st * 2.0 + shift;
        a *= 0.5;
    }
    return v;
}

void main() {
    vec2 st = gl_FragCoord.xy/u_res.xy*3.;
    // st += st * abs(sin(u_time*0.1)*3.0);
    vec3 color = vec3(0.0);

    vec2 q = vec2(0.);
    q.x = fbm( st + 0.00*u_time);
    q.y = fbm( st + vec2(1.0));

    vec2 r = vec2(0.);
    r.x = fbm( st + 1.0*q + vec2(1.7,9.2)+ 0.15*u_time );
    r.y = fbm( st + 1.0*q + vec2(8.3,2.8)+ 0.126*u_time);

    float f = fbm(st+r);

    color = mix(vec3(0.101961,0.619608,0.666667),
                vec3(0.666667,0.666667,0.498039),
                clamp((f*f)*4.0,0.0,1.0));

    color = mix(color,
                vec3(0,0,0.164706),
                clamp(length(q),0.0,1.0));

    color = mix(color,
                vec3(0.666667,1,1),
                clamp(length(r.x),0.0,1.0));

    gl_FragColor = vec4((f*f*f+.6*f*f+.5*f)*color,0.5);
}
