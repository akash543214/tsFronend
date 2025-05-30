import Button from "../Components/Assets/Button";
import { CheckCircleIcon } from "lucide-react";
import FeatureCard from '../Components/Assets/Card';
import Footer from "@/Components/Footer";

const LandingPage = () => {
  return (
    <div className="relative flex min-h-screen flex-col bg-white overflow-x-hidden" style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}>
      <div className="layout-container flex h-full grow flex-col">
      

        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            {/* Hero Section */}
            <div className="container mx-auto">
              <div className="p-4">
                <div
                  className="flex min-h-[480px] flex-col gap-6 bg-cover bg-center bg-no-repeat rounded-lg items-start justify-end px-4 pb-10 md:px-10"
                  style={{
                    backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.4) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuBkinLfRu3ZCZKEqgowCQwJDnNG1IJRebC3Ud7_ZP0GgHLN6Fa-EVYoZQCUGLUqqWWy8vC4weGj9TJKC8F4VCtpzc9zkTPKRSieanuo-hMgS1sdUZo2kJIX4chMIWkoegNImiXSOHco-vvMjy6yvMSh5Uc2uds28BRRrO3ivdTM3QyCNrxqcomKcFpdpo1iCFOhd0BYScXzvyTJfIRk_rLZiMK122JNJwWUAWf5z3MngJI65dt8hsqPmzXjWrMtYEwP8QlsGyLetl6e")'
                  }}
                >
                  <div className="flex flex-col gap-2 text-left">
                    <h1 className="text-white text-4xl font-black leading-tight tracking-tight md:text-5xl">
                      AI-Powered Project Management
                    </h1>
                    <h2 className="text-white text-sm font-normal leading-normal md:text-base">
                      Revolutionize your project workflows with intelligent automation and predictive insights. Project AI helps teams achieve more with less effort.
                    </h2>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 md:h-12 md:px-5 bg-blue-500 hover:bg-blue-600 text-white text-sm font-bold leading-normal tracking-wide md:text-base transition-colors">
                      <span className="truncate">Get Started</span>
                    </button>
                    <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 md:h-12 md:px-5 bg-gray-100 hover:bg-gray-200 text-gray-900 text-sm font-bold leading-normal tracking-wide md:text-base transition-colors">
                      <span className="truncate">Request a Demo</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Key Features Section */}
            <div className="flex flex-col gap-10 px-4 py-10">
              <div className="flex flex-col gap-4">
                <h1 className="text-gray-900 text-3xl font-bold leading-tight md:text-4xl md:font-black max-w-[720px]">
                  Key Features
                </h1>
                <p className="text-gray-900 text-base font-normal leading-normal max-w-[720px]">
                  Project AI offers a suite of powerful features designed to streamline your project management process.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                <div className="flex flex-1 gap-3 rounded-lg border border-gray-300 bg-white p-4 flex-col hover:shadow-lg transition-shadow">
                  <div className="text-gray-900">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                      <path d="M48,64a8,8,0,0,1,8-8H72V40a8,8,0,0,1,16,0V56h16a8,8,0,0,1,0,16H88V88a8,8,0,0,1-16,0V72H56A8,8,0,0,1,48,64ZM184,192h-8v-8a8,8,0,0,0-16,0v8h-8a8,8,0,0,0,0,16h8v8a8,8,0,0,0,16,0v-8h8a8,8,0,0,0,0-16Zm56-48H224V128a8,8,0,0,0-16,0v16H192a8,8,0,0,0,0,16h16v16a8,8,0,0,0,16,0V160h16a8,8,0,0,0,0-16ZM219.31,80,80,219.31a16,16,0,0,1-22.62,0L36.68,198.63a16,16,0,0,1,0-22.63L176,36.69a16,16,0,0,1,22.63,0l20.68,20.68A16,16,0,0,1,219.31,80Zm-54.63,32L144,91.31l-96,96L68.68,208ZM208,68.69,187.31,48l-32,32L176,100.69Z" />
                    </svg>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h2 className="text-gray-900 text-base font-bold leading-tight">AI-Driven Task Prioritization</h2>
                    <p className="text-gray-600 text-sm font-normal leading-normal">
                      Let our AI prioritize tasks based on urgency, deadlines, and dependencies, ensuring critical items are addressed first.
                    </p>
                  </div>
                </div>
                <div className="flex flex-1 gap-3 rounded-lg border border-gray-300 bg-white p-4 flex-col hover:shadow-lg transition-shadow">
                  <div className="text-gray-900">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                      <path d="M136,80v43.47l36.12,21.67a8,8,0,0,1-8.24,13.72l-40-24A8,8,0,0,1,120,128V80a8,8,0,0,1,16,0Zm-8-48A95.44,95.44,0,0,0,60.08,60.15C52.81,67.51,46.35,74.59,40,82V64a8,8,0,0,0-16,0v40a8,8,0,0,0,8,8H72a8,8,0,0,0,0-16H49c7.15-8.42,14.27-16.35,22.39-24.57a80,80,0,1,1,1.66,114.75,8,8,0,1,0-11,11.64A96,96,0,1,0,128,32Z" />
                    </svg>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h2 className="text-gray-900 text-base font-bold leading-tight">Automated Scheduling</h2>
                    <p className="text-gray-600 text-sm font-normal leading-normal">
                      Automatically generate project schedules that optimize resource allocation and minimize conflicts, saving you time and effort.
                    </p>
                  </div>
                </div>
                <div className="flex flex-1 gap-3 rounded-lg border border-gray-300 bg-white p-4 flex-col hover:shadow-lg transition-shadow">
                  <div className="text-gray-900">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                      <path d="M244.8,150.4a8,8,0,0,1-11.2-1.6A51.6,51.6,0,0,0,192,128a8,8,0,0,1-7.37-4.89,8,8,0,0,1,0-6.22A8,8,0,0,1,192,112a24,24,0,1,0-23.24-30,8,8,0,1,1-15.5-4A40,40,0,1,1,219,117.51a67.94,67.94,0,0,1,27.43,21.68A8,8,0,0,1,244.8,150.4ZM190.92,212a8,8,0,1,1-13.84,8,57,57,0,0,0-98.16,0,8,8,0,1,1-13.84-8,72.06,72.06,0,0,1,33.74-29.92,48,48,0,1,1,58.36,0A72.06,72.06,0,0,1,190.92,212ZM128,176a32,32,0,1,0-32-32A32,32,0,0,0,128,176ZM72,120a8,8,0,0,0-8-8A24,24,0,1,1,87.24,82a8,8,0,1,0,15.5-4A40,40,0,1,0,37,117.51,67.94,67.94,0,0,0,9.6,139.19a8,8,0,1,0,12.8,9.61A51.6,51.6,0,0,1,64,128,8,8,0,0,0,72,120Z" />
                    </svg>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h2 className="text-gray-900 text-base font-bold leading-tight">Team Collaboration Tools</h2>
                    <p className="text-gray-600 text-sm font-normal leading-normal">
                      Foster seamless collaboration with built-in tools for communication, file sharing, and progress tracking, keeping everyone aligned.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* How It Works Section */}
            <div className="flex flex-col gap-10 px-4 py-10">
              <div className="flex flex-col gap-4">
                <h1 className="text-gray-900 text-3xl font-bold leading-tight md:text-4xl md:font-black max-w-[720px]">
                  How It Works
                </h1>
                <p className="text-gray-900 text-base font-normal leading-normal max-w-[720px]">
                  Project AI simplifies project management with an intuitive interface and powerful AI capabilities.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                <div className="flex flex-col gap-3 pb-3">
                  <div
                    className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-lg hover:scale-105 transition-transform"
                    style={{
                      backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuA_CJq8-0N_W8PWayp10-dMctS6aOk7dm_YycTlPZfd05VLytZs3q0dz5OKAXaveAujkzZtM2XHS54CAK62Ur2F02Wa4qyhEQb2jM1-36hg0nG-ppeCLGjsI0Yv1TijxTF1Jym3v6dfPpQJIZ-tnzi58RLspUoKpiK2e5VmBswch-Psmkk2FzNt1bdLVIWO3A1UtBgfwqyiVOjktkERP9sL9pbGSI_W415gTAbsL2g9UGL9Qger-FEjsOYOtwKr9spYVhVWg_K7BdkD")'
                    }}
                  />
                  <div>
                    <p className="text-gray-900 text-base font-medium leading-normal">Plan Your Project</p>
                    <p className="text-gray-600 text-sm font-normal leading-normal">
                      Define project goals, tasks, and dependencies with ease. Our AI assists in creating a comprehensive project plan.
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-3 pb-3">
                  <div
                    className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-lg hover:scale-105 transition-transform"
                    style={{
                      backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDQw7VC8yNnKA0COo555rLUS-uU5l0CQT4-U22qb0R0p-cpe6eRUfQ7zaUsOaUcObOVxGPjTZhcThicPzlHhpyuvQp3C6YdBPy5X2nczh6mZN7IkSdFf3hXRsgmWcYQ2WHsRtRfcYE4Lz2efL76wCfqBA6OQv2gE4buv_ul0ZJeQuIpt96SrPCPojnQTxbk0IUnMQ3wn2jDoSwpD4XrqSvVKJxOtNTdHLJk5E3zlTLDE8Tecn8YXc1UfYpXqqNxIXjkfhMqQnABrRCf")'
                    }}
                  />
                  <div>
                    <p className="text-gray-900 text-base font-medium leading-normal">Collaborate with Your Team</p>
                    <p className="text-gray-600 text-sm font-normal leading-normal">
                      Invite team members, assign tasks, and communicate effectively within the platform. Share files and updates in real-time.
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-3 pb-3">
                  <div
                    className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-lg hover:scale-105 transition-transform"
                    style={{
                      backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCjc5DxLIi5h3OzlDJ4JatE1-uEJzkHk2UNNVpgrtWW8ORhF9tpHlENZQ4QLB8e_SDheen7Pb2qRnhcLkJDmlOO6iXLrTXpflRA_csi9mrun-x04rRezJnVVmu7jDBn165aHhlJg4k0q08SEWNpFJwDpUW4PPYoSrTtWx_WldfdL5zhFUVLMlABI9u5CtRGw0cVcJHYuFuYaLOuxH3afXGuA_VZAJtcqgZNpW8FPKecWGB76TZ9QBlDMYv_NrJK52awajjdfXehLGN4")'
                    }}
                  />
                  <div>
                    <p className="text-gray-900 text-base font-medium leading-normal">Track Progress and Optimize</p>
                    <p className="text-gray-600 text-sm font-normal leading-normal">
                      Monitor project progress, identify bottlenecks, and optimize your workflow based on AI-driven insights and performance data.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="container mx-auto">
              <div className="flex flex-col justify-end gap-6 px-4 py-10 md:gap-8 md:px-10 md:py-20">
                <div className="flex flex-col gap-2 text-center">
                  <h1 className="text-gray-900 text-3xl font-bold leading-tight md:text-4xl md:font-black max-w-[720px] mx-auto">
                    Ready to Transform Your Project Management?
                  </h1>
                </div>
                <div className="flex flex-1 justify-center">
                  <div className="flex justify-center">
                    <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 md:h-12 md:px-5 bg-blue-500 hover:bg-blue-600 text-white text-sm font-bold leading-normal tracking-wide md:text-base grow transition-colors">
                      <span className="truncate">Get Started</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <footer className="flex flex-col gap-6 px-5 py-10 text-center">
              <div className="flex flex-wrap items-center justify-center gap-6 md:flex-row md:justify-around">
                <a className="text-gray-600 text-base font-normal leading-normal min-w-40 hover:text-blue-500 transition-colors" href="#">Product</a>
                <a className="text-gray-600 text-base font-normal leading-normal min-w-40 hover:text-blue-500 transition-colors" href="#">Solutions</a>
                <a className="text-gray-600 text-base font-normal leading-normal min-w-40 hover:text-blue-500 transition-colors" href="#">Pricing</a>
                <a className="text-gray-600 text-base font-normal leading-normal min-w-40 hover:text-blue-500 transition-colors" href="#">Resources</a>
                <a className="text-gray-600 text-base font-normal leading-normal min-w-40 hover:text-blue-500 transition-colors" href="#">Contact Us</a>
              </div>
              <div className="flex flex-wrap justify-center gap-4">
                <a href="#" className="text-gray-600 hover:text-blue-500 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                    <path d="M247.39,68.94A8,8,0,0,0,240,64H209.57A48.66,48.66,0,0,0,168.1,40a46.91,46.91,0,0,0-33.75,13.7A47.9,47.9,0,0,0,120,88v6.09C79.74,83.47,46.81,50.72,46.46,50.37a8,8,0,0,0-13.65,4.92c-4.31,47.79,9.57,79.77,22,98.18a110.93,110.93,0,0,0,21.88,24.2c-15.23,17.53-39.21,26.74-39.47,26.84a8,8,0,0,0-3.85,11.93c.75,1.12,3.75,5.05,11.08,8.72C53.51,229.7,65.48,232,80,232c70.67,0,129.72-54.42,135.75-124.44l29.91-29.9A8,8,0,0,0,247.39,68.94Zm-45,29.41a8,8,0,0,0-2.32,5.14C196,166.58,143.28,216,80,216c-10.56,0-18-1.4-23.22-3.08,11.51-6.25,27.56-17,37.88-32.48A8,8,0,0,0,92,169.08c-.47-.27-43.91-26.34-44-96,16,13,45.25,33.17,78.67,38.79A8,8,0,0,0,136,104V88a32,32,0,0,1,9.6-22.92A30.94,30.94,0,0,1,167.9,56c12.66.16,24.49,7.88,29.44,19.21A8,8,0,0,0,204.67,80h16Z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-600 hover:text-blue-500 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                    <path d="M216,24H40A16,16,0,0,0,24,40V216a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V40A16,16,0,0,0,216,24Zm0,192H40V40H216V216ZM96,112v64a8,8,0,0,1-16,0V112a8,8,0,0,1,16,0Zm88,28v36a8,8,0,0,1-16,0V140a20,20,0,0,0-40,0v36a8,8,0,0,1-16,0V112a8,8,0,0,1,15.79-1.78A36,36,0,0,1,184,140ZM100,84A12,12,0,1,1,88,72,12,12,0,0,1,100,84Z" />
                  </svg>
                </a>
              </div>
              <p className="text-gray-600 text-base font-normal leading-normal">@2024 Project AI. All rights reserved.</p>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
