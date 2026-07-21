#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float sd_circle(in vec2 p, in float r) {
    return length(p) - r;
}

void main() {
    vec2 st = gl_FragCoord.xy / u_resolution;
    vec2 pos = (2.0 * gl_FragCoord.xy - u_resolution.xy) / u_resolution.y;

    float l = smoothstep(0.0, 1.0, st.x);
    float y = smoothstep(0.0, 1.0,st.y); 

    vec2 uh = vec2(l,y); 

    vec2 new_pos = vec2(0.4);

    float c = sd_circle(uh - new_pos, 0.02);
    float c2 = sd_circle(u_mouse / u_resolution, 0.2); 

    vec3 col = vec3(smoothstep(0.0,1.0,c + c2)); 

    gl_FragColor = vec4(col, 1.0);
}
