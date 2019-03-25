const fsSource = `
precision mediump float;


varying vec2 vTextureCoord;
varying vec3 vNormal;

uniform vec3 ambientLightIntensity;
uniform vec3 sunLightIntensity;
uniform vec3 sunLightDirection;

uniform sampler2D uSampler;

void main(void) {

  vec3 normSunDirection = normalize(sunLightDirection);
  vec3 surfaceNormal = normalize(vNormal);
  vec4 texture = texture2D(uSampler, vTextureCoord);

  vec3 lightIntensity = ambientLightIntensity + sunLightIntensity * max(dot(surfaceNormal, normSunDirection), 0.0);

  gl_FragColor = vec4(texture.rgb * lightIntensity, texture.a);
}

`;