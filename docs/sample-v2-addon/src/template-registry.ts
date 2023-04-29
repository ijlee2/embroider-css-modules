import type HelloWorldComponent from './components/hello-world';

export default interface SampleV2AddonRegistry {
  HelloWorld: typeof HelloWorldComponent;
}
