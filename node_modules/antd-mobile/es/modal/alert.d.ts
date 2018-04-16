/// <reference types="react" />
import React from 'react';
export default function alert(title: React.ReactType, message: React.ReactType, actions?: {
    text: string;
}[], platform?: string): {
    close: () => void;
};
