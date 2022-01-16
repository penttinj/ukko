import React from 'react';
import styled from '@emotion/styled';

const Container = styled.div`
    display: flex;
`;

type PaneProps = {
    weight: number
}

// accessing props with template literal css block https://emotion.sh/docs/typescript
const PaneCSSBlock = styled.div<PaneProps>`
    background: DarkSeaGreen;
    flex: ${props => props.weight};
`;

// accessing props with object style
const PaneObjectStyle = styled('div')<PaneProps>({
    background: 'SeaGreen',
},
props => ({
    flex: props.weight,
}),
);

interface ItemProps {
    // react.FunctionComponent<any>[];
    // https://stackoverflow.com/questions/31815633/what-does-the-
    // error-jsx-element-type-does-not-have-any-construct-or-call
    // eslint-disable-next-line no-undef
    children: JSX.Element[];
    leftWeight: number;
    rightWeight: number;
}

export const SplitScreen = ({
    children,
    leftWeight,
    rightWeight,
}: ItemProps) => {
    const [left, right] = children;
    return (
        <Container>
            <PaneObjectStyle weight={leftWeight}>
                {left}
            </PaneObjectStyle>
            <PaneCSSBlock weight={rightWeight}>
                {right}
            </PaneCSSBlock>
        </Container>
    );
};
