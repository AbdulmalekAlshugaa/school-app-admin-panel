import * as React from 'react';
import Button from '@mui/material/Button';

interface AppButtonProps {
    text: string;
    }

export default function AppButton() {
  return <Button variant="contained">Hello world</Button>;
}