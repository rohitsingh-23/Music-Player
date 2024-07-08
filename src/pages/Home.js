import React, { useEffect, useState } from "react";
import { FaMusic } from "react-icons/fa";
import { MdHome } from "react-icons/md";
import { FaArrowTrendUp } from "react-icons/fa6";
import { BiSolidMusic } from "react-icons/bi";
import { AiFillCompass } from "react-icons/ai";
import { IoSettings } from "react-icons/io5";
import { MdLogout } from "react-icons/md";
import data from "../data.json";
import NowPlaying from "../components/NowPlaying";

const Home = () => {
  const [nowPlaying, setNowPlaying] = useState(data.songs[0]);

  useEffect(() => {
    setNowPlaying(data.songs[0]);
  }, []);

  const handleNext = () => {
    console.log("first")
    if (nowPlaying.id == data.songs.length) {
      setNowPlaying(data.songs[0]);
    } else {
      setNowPlaying(data.songs[nowPlaying.id]);
    }
  }

  const handlePrev = () => {
    console.log("first");
    if (nowPlaying.id == 1) {
      setNowPlaying(data.songs[data.songs.length -1 ]);
    } else {
      setNowPlaying(data.songs[nowPlaying.id - 2]);
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <div className="flex flex-col md:flex-row">
        <aside className="w-screen h-screen md:w-64 bg-[#1a1a1a] p-4">
          <div className="flex items-center mb-8">
            <FaMusic className="text-primary-red text-[25px]" />
            <span className="ml-2 text-2xl font-bold text-primary-red ">
              Dream
            </span>
            <span className="text-2xl font-bold text-white">Music</span>
          </div>
          <nav className="space-y-4  h-[90%] flex flex-col justify-between ">
            <div className="space-y-2">
              <h3 className="font-semibold text-muted-foreground text-[12px]">
                MENU
              </h3>
              <ul className="space-y-2">
                <li className="flex items-center space-x-2">
                  <MdHome className="text-primary-red" />
                  <a href="#" className="block">
                    Home
                  </a>
                </li>
                <li className="flex items-center space-x-2">
                  <FaArrowTrendUp className="text-primary-red" />
                  <a href="#" className="block">
                    Trends
                  </a>
                </li>
                <li className="flex items-center space-x-2">
                  <BiSolidMusic className="text-primary-red" />
                  <a href="#" className="block">
                    Library
                  </a>
                </li>
                <li className="flex items-center space-x-2">
                  <AiFillCompass className="text-primary-red" />
                  <a href="#" className="block">
                    Discover
                  </a>
                </li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-muted-foreground text-[12px]">
                GENERAL
              </h3>
              <ul className="space-y-2">
                <li className="flex items-center space-x-2">
                  <IoSettings className="text-primary-red" />
                  <a href="#" className="block">
                    Settings
                  </a>
                </li>
                <li className="flex items-center space-x-2">
                  <MdLogout className="text-primary-red" />
                  <a href="#" className="block">
                    Log Out
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </aside>
        <main className="flex-1 bg-[#2b0000] p-8">
          <header className="flex flex-col md:flex-row items-center justify-between mb-8">
            <nav className="flex space-x-4 mb-4 md:mb-0">
              <a href="#" className="text-[14px] font-semibold ">
                Music
              </a>
              <a href="#" className="text-[14px] font-semibold">
                Podcast
              </a>
              <a href="#" className="text-[14px] font-semibold">
                Live
              </a>
              <a href="#" className="text-[14px] font-semibold">
                Radio
              </a>
              <a href="#" className="text-[14px] font-semibold">
                Michael Jackson
              </a>
            </nav>
            <div className="relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="absolute left-2.5 top-2.5 h-5 w-5 text-muted-foreground"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </svg>
              <input
                placeholder="Search"
                className="pl-10 pr-4 py-2 rounded-full bg-[#3a0000] text-white"
                type="search"
              />
            </div>
          </header>
          <img
            src="/images/artist-banner.jpg"
            className="w-[100%] h-[300px] object-cover"
            alt=""
          />
          <section>
            <div className="flex flex-col md:flex-row items-center justify-between mb-4 mt-4">
              <h2 className="text-[14px] font-semibold">Popular</h2>
              <a
                href="#"
                className=" font-semibold text-muted-foreground text-[12px]"
              >
                See All
              </a>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-muted-foreground">
                    <th className="py-2 px-[16px]">#</th>
                    <th className="py-2">TITLE</th>
                    <th className="py-2">PLAYING</th>
                    <th className="py-2 pr-[16px]">TIME</th>
                    <th className="py-2">ALBUM</th>
                  </tr>
                </thead>
                <tbody>
                  {data.songs.map((item) => {
                    return (
                      <tr key={item.id}
                        className={`border-b border-muted-foreground ${
                          item.id == nowPlaying.id ? "bg-[#520000]" : ""
                        }`}
                        onClick={() => setNowPlaying(item)}
                      >
                        <td className="py-2 px-[16px]">
                          {nowPlaying.id == item.id ? (
                            <FaMusic className="text-primary-white" />
                          ) : (
                            item.id
                          )}
                        </td>
                        <td className="py-2 flex items-center space-x-2">
                          <img
                            src={`/images/${item.img}`}
                            alt="Billie Jean"
                            className="w-10 h-10 rounded"
                            width="40"
                            height="40"
                            style={{
                              aspectRatio: "40 / 40",
                              objectFit: "cover",
                            }}
                          />
                          <span>{item.title}</span>
                        </td>
                        <td className="py-2">1.040.811.084</td>
                        <td className="py-2">{item.time}</td>
                        <td className="py-2">{item.album}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>
        </main>
        {/* <aside className="w-full md:w-64  p-8">
          <div className="flex flex-col items-center bg-[#3a0000] p-[10px] overflow-hidden">
            <h3 className="text-lg font-semibold mb-4">Now Playing</h3>
            <img
              src="/placeholder.svg"
              alt="Now Playing"
              className="w-48 h-48 rounded-lg mb-4"
            />
            <div className="text-center">
              <h4 className="text-lg font-semibold">Beat It</h4>
              <p className="text-sm text-muted-foreground">Michael Jackson</p>
            </div>
            <div className="flex items-center justify-between w-full mt-4">
              <span>2:15</span>
              <input type="range" className="flex-1 mx-2" />
              <span>4:18</span>
            </div>
            <div className="flex items-center justify-between w-full mt-4">
            </div>
          </div>
        </aside> */}
        <NowPlaying nowPlaying={nowPlaying} setNowPlaying={setNowPlaying} handleNext={handleNext} handlePrev={handlePrev} />
      </div>
    </div>
  );
};

export default Home;
