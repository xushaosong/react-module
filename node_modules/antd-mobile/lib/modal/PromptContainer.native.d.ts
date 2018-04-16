/// <reference types="react" />
import React from 'react';
import { CallbackOrActions } from './PropsType';
import { IPromptStyle } from './style/prompt.native';
export interface PropmptContainerProps {
    title: React.ReactType;
    message?: React.ReactType;
    type?: 'default' | 'login-password' | 'secure-text';
    defaultValue?: string;
    actions: CallbackOrActions;
    onAnimationEnd?: (visible: boolean) => void;
    styles?: IPromptStyle;
    placeholders?: string[];
}
export default class PropmptContainer extends React.Component<PropmptContainerProps, any> {
    static defaultProps: {
        type: string;
        defaultValue: string;
        styles: any;
    };
    constructor(props: PropmptContainerProps);
    onClose: () => void;
    onChangeText(type: string, value: string): void;
    render(): JSX.Element;
}
