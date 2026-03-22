### install:
- uses [glsl-canvas](https://marketplace.visualstudio.com/items?itemName=circledev.glsl-canvas) on vscode to locally preview without setting up an index. my guess is that the canvas is passed as an edge-to-edge rectangle. 

The attributes provided are a_position, a_normal, a_texcoord, a_color.

Type	Property
vec4	a_position
vec4	a_normal
vec2	a_texcoord
vec4	a_color

The uniforms provided are u_resolution, u_time, u_mouse, u_camera and u_trails[10].

Type	Property
vec2	u_resolution
float	u_time
vec2	u_mouse
vec3	u_camera
vec2[10]	u_trails[10]

see more here: https://marketplace.visualstudio.com/items?itemName=circledev.glsl-canvas

---
### preview locally: 
- `cmd + shift + p` and open show glsl-canvas.
---
later for sharing with html, see sharing.html in template. include `<canvas class="glsl-canvas" data-fragment-url="./frag.frag"></canvas>` to load into a predefined canvas. 