import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import SigninForm from "./components/SigninForm";
// // import SignupFormDemo from "./components/signup-form-demo";
// import AboutTab from "./NAVTAB/AboutTab";
// import ServicesTab from "./NAVTAB/ServicesTab";
import About from "./section/About";
import { Navbar } from "./components/Navbar";
import AboutTab from './NAVTAB/AboutTab';
import ServicesTab from './NAVTAB/ServicesTab';
import Contact from './NAVTAB/Contact';
import Doc from './NAVTAB/Doc';
// import Emotion from './NAVTAB/Models/Emotion';
import Models from './section/Models';
import FrameX from './NAVTAB/Models/FrameX';
import { RedirectToSignIn, SignedIn, SignedOut } from '@clerk/clerk-react';
import Ollama from './NAVTAB/Models/Ollama';
import { GoogleGeminiEffectDemo } from '@/components/google-gemini-demo';
import EmotionDetection from './NAVTAB/Models/Emotion-detection/Emotion_detection';
import TextEmotion from './NAVTAB/Models/Emotion-detection/Models/Text_emo';
import AudioEmotionDetection from './NAVTAB/Models/Emotion-detection/Models/Audio_emotion_detection';
import VideoEmotion from './NAVTAB/Models/Emotion-detection/Models/Video_emo';
import MultimodalLLM from './NAVTAB/Models/Emotion-detection/Models/MultimodelLLM';
import MultimodalDL from './NAVTAB/Models/Emotion-detection/Models/MultimodelDL';

const Home = () => {
  return (
    <>
                  <GoogleGeminiEffectDemo/>
      
      <About/>
      <Models/>

    </>
  );
};

const App = () => {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutTab />} />
        <Route path="/services" element={
        <>
        <SignedIn>
          <ServicesTab />
         </SignedIn>

         <SignedOut>
          <RedirectToSignIn/>
         </SignedOut>
        </>

          } />
        <Route path="/services/frame-x" element={
          <>
          <SignedIn>
          <FrameX />
         </SignedIn>

         <SignedOut>
          <RedirectToSignIn/>
         </SignedOut>
         </>
        } />

        <Route path="/services/vedya" element={
          <>
          <SignedIn>
          <Ollama/>
         </SignedIn>

         <SignedOut>
          <RedirectToSignIn/>
         </SignedOut>
         </>
        } />

        <Route path="/services/emotion-detection" element={
          <>
          <SignedIn>
          <EmotionDetection/>
         </SignedIn>

         <SignedOut>
          <RedirectToSignIn/>
         </SignedOut>
         </>
        } />

        <Route path="/services/emotion-detection/text" element={
          <>
          <SignedIn>
          <TextEmotion/>
         </SignedIn>

         <SignedOut>
          <RedirectToSignIn/>
         </SignedOut>
         </>
        } />

        <Route path="/services/emotion-detection/audio" element={
          <>
          <SignedIn>
          <AudioEmotionDetection/>
         </SignedIn>

         <SignedOut>
          <RedirectToSignIn/>
         </SignedOut>
         </>
        } />

        <Route path="/services/emotion-detection/video" element={
          <>
          <SignedIn>
          <VideoEmotion/>
         </SignedIn>

         <SignedOut>
          <RedirectToSignIn/>
         </SignedOut>
         </>
        } />

        <Route path="/services/emotion-detection/multimodal-llm" element={
          <>
          <SignedIn>
          <MultimodalLLM/>
         </SignedIn>

         <SignedOut>
          <RedirectToSignIn/>
         </SignedOut>
         </>
        } />

        <Route path="/services/emotion-detection/multimodal-dl" element={
          <>
          <SignedIn>
          <MultimodalDL/>
         </SignedIn>

         <SignedOut>
          <RedirectToSignIn/>
         </SignedOut>
         </>
        } />

        <Route path="/contact" element={<Contact />} />
        <Route path="/docs" element={<Doc />} />
       
       


        {/* <Route path="/about" element={<AboutTab />} />
        <Route path="/services" element={<ServicesTab />} />
        <Route path="/signin" element={<SigninForm />} /> */}
        {/* <Route path="/signup" element={<SignupFormDemo />} /> */}
      </Routes>
    </Router>
    
  );
};

export default App;