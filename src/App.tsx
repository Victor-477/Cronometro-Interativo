/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { TimerProvider, useTimer } from './store/TimerContext';
import { Player } from './components/Player';
import { Studio } from './components/Studio';

const AppContent = () => {
  const { mode } = useTimer();

  return (
    <>
      {mode === 'player' ? <Player /> : <Studio />}
    </>
  );
};

export default function App() {
  return (
    <TimerProvider>
      <AppContent />
    </TimerProvider>
  );
}
