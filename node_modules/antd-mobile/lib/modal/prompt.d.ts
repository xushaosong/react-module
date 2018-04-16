/// <reference types="react" />
import React from 'react';
import { CallbackOrActions } from './PropsType';
export default function prompt(title: React.ReactType, message: React.ReactType, callbackOrActions: CallbackOrActions, type?: string, defaultValue?: string, placeholders?: string[], platform?: string): {
    close: () => void;
};
