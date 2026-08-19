import React from 'react';
import { SidebarLeft } from './SidebarLeft';
import { Canvas } from './Canvas';
import { SidebarRight } from './SidebarRight';
import { TopBar } from './TopBar';

export const Studio = () => {
  return (
    <div className="bg-background text-on-background h-screen flex flex-col font-body overflow-hidden">
      <TopBar />
      <div className="flex flex-1 overflow-hidden">
        <SidebarLeft />
        <Canvas />
        <SidebarRight />
      </div>
    </div>
  );
};
