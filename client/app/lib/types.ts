export type BootMessage = {
    id: number;
    text: string;
    type: 'success' | 'info' | 'warning' | 'error';
    delay: number;
  }
  
  export type AvailableOS = 'windows11' | 'windows10' | 'windows8' | 'windows7';