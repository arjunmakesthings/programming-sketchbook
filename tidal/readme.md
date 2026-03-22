### install:
instructions [here](https://tidalcycles.org/docs/getting-started/macos_install).

need the following to work: 
- ghcup for haskell
- cabal package system
- tidal cycles with `BootTidal.hs`
- text editor (can edit in terminal by loading BootTidal.hs)
- tidalcycles plugin for the text editor (for auto-completion, shortcuts, et-cetera). 
- super-collider for audio-generation
- superdirt (samples)
- sc-3 (unit generator plugins)

---
### preview locally: 
- use `sclang` to start supercollider. it starts by default with the [startup script](/resources/default-startup-script). 

- make a `.tidal` file. 

- shortcuts: 
    - `Shift+Enter` to evaluate a single line
    - `Ctrl+Enter` to evaluate multiple lines
    - `Ctrl+Option+H` to hush

- remember that the sample rate must be agreed upon. a pair of bluetooth headphones have a different sample-rate than wired-ones or headphones. 