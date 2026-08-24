import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BottomNav from './components/BottomNav';
import Home from './pages/Home';
import Events from './pages/Events';
import EventDetail from './pages/EventDetail';
import Watch from './pages/Watch';
import SermonDetail from './pages/SermonDetail';
import Live from './pages/Live';
import More from './pages/More';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen pb-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/:id" element={<EventDetail />} />
          <Route path="/watch" element={<Watch />} />
          <Route path="/watch/sermon/:id" element={<SermonDetail />} />
          <Route path="/live" element={<Live />} />
          <Route path="/more" element={<More />} />
        </Routes>
      </div>
      <BottomNav />
    </BrowserRouter>
  );
}
