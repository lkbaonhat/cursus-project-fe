import Snow from '@/components/atoms/Snow/snow';
import { Sidebar } from '@/components/Sidebar/Sidebar';
import Footer from '@/components/templates/Footer/Footer';
import Header1 from '@/components/templates/Header/Header1';
import '@/layouts/styles/layout.main.scss';
import { selectStateIsOpen } from '@/modules/global/selector';
import { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
// import Chirstmas from '../assest/christmast.mp3';
import { FaPlay, FaPause, FaVolumeMute, FaVolumeDown, FaVolumeUp } from "react-icons/fa";
import { useAudio } from '@/contexts/useAudio';

interface LayoutMainProps {
  Component: React.ComponentType;
}

const LayoutMain = ({ Component }: LayoutMainProps) => {
  const isOpen = useSelector(selectStateIsOpen);

  const [widthContent, setWidthContent] = useState(255);
  // const [isPlaying, setIsPlaying] = useState(false);
  // const [volume, setVolume] = useState(0.2);
  const [volumeVisible, setVolumeVisible] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const { isPlaying, setIsPlaying, volume, setVolume }: AudioContext = useAudio();

  useEffect(() => {
    if (isOpen) {
      setWidthContent(250);
    } else {
      setWidthContent(0);
    }
  }, [isOpen]);

  // useEffect(() => {
  //   if (audioRef.current) {
  //     if (isPlaying) {
  //       audioRef.current.play();
  //     } else {
  //       audioRef.current.pause();
  //     }
  //   }
  // }, [isPlaying]);

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  // useEffect(() => {
  //   if (audioRef.current) {
  //     audioRef.current.volume = volume;
  //   }
  // }, [volume]);

  return (
    <div className='layout-main'>
      <div className='header'>
        <Header1 />
      </div>

      <div className='main-content'>
        <div className={`sidebar ${isOpen ? '' : 'closed'}`}>
          <Sidebar role={'guest'} />
        </div>
        <div
          className='content'
          style={{ width: `calc(100% - ${widthContent}px)` }}
        >
          <div className='component'>
            <Component />

            {/* Điều khiển bài hát */}
            <div className="noel-house mb-2 me-4">

              {/* Điều khiển đĩa nhạc */}
              {/* <audio ref={audioRef} src={Chirstmas} autoPlay loop style={{ height: "100px", width: "100px" }} /> */}
              <div className='vinyl-record-layer'>
                <div
                  className={`vinyl-record d-flex justify-content-center align-items-center ${isPlaying ? "playing" : ""
                    }`}
                  onClick={() => setIsPlaying(!isPlaying)}
                >

                  <img
                    src="https://png.pngtree.com/png-vector/20190130/ourlarge/pngtree-christmas-pine-tree-hand-drawn-under-snow-green-commercial-elements-paintedsnowinggreenfreshchristmas-png-image_672093.jpg"
                    alt="Snowman Vinyl"
                    className="vinyl-image"
                  />
                  <button
                    style={{
                      border: "none",
                      borderRadius: "50%",
                      backgroundColor: "white",
                      height: "30px",
                      width: "30px",
                      padding: 0,
                    }}
                  >
                    {isPlaying ? <FaPause size={14} /> : <FaPlay size={14} />}
                  </button>
                </div>
                <div className='vinyl-shadow'></div>
              </div>


              {/* Điều khiển âm lượng */}
              <div className="volume-control mt-4">
                <div className="volume-icon" onClick={() => setVolumeVisible(!volumeVisible)}>
                  {volume === 0 ? (
                    <FaVolumeMute size={24} />
                  ) : volume < 0.5 ? (
                    <FaVolumeDown size={24} />
                  ) : (
                    <FaVolumeUp size={24} />
                  )}
                </div>

                {volumeVisible && (
                  <div className="volume-slider">
                    <input
                      type="range"
                      id="volume"
                      min="0"
                      max="1"
                      step="0.01"
                      value={volume}
                      onChange={handleVolumeChange}
                      className="slider"
                    />
                  </div>
                )}


              </div>

            </div>


          </div>
          <div className='footer'>
            <Footer />
          </div>
        </div>
      </div>
      <Snow />
    </div>
  );
};

export default LayoutMain;
