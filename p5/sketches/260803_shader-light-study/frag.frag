#ifdef GL_ES
precision highp float;
#endif

uniform float u_time;
uniform vec2 u_res;

#define PI 3.14159265359

float hash(float n) {
    return fract(sin(n) * 43758.5453123);
}

float noise(float x) {
    float i = floor(x);
    float f = fract(x);

    f = f * f * (3.0 - 2.0 * f);

    return mix(hash(i), hash(i + 1.0), f);
}

void main() {

    vec2 uv = (gl_FragCoord.xy - 0.5 * u_res.xy) / u_res.y;

    float t = u_time * 0.5;

    float r = length(uv);

    float angle = atan(uv.y, uv.x);

    float swirl = 1.0;

    angle += swirl * u_time * 0.05;

    float color = r;

    vec3 col = vec3(t / t); 

    // col += vec3(sin(angle + r - t), cos(angle + r + t), 1.0);

    col.r+=sin(angle + r - t); 
    gl_FragColor = vec4(col, 1.0);
}