import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  { path: '', renderMode: RenderMode.Server },
  { path: 'favoris', renderMode: RenderMode.Server },
  { path: 'personne/:id', renderMode: RenderMode.Server },
  { path: '**', renderMode: RenderMode.Server },
];
