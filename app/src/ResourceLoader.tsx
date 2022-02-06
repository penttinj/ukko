import React, { useState, useEffect } from 'react';

export const ResourceLoader = (
    { resourceUrl, resourceName, children }:
        // eslint-disable-next-line no-undef
        { resourceUrl: string, resourceName: string, children: JSX.Element[] | JSX.Element },
) => {
    const [state, setState] = useState<{} | null>(null);

    useEffect(() => {
        (async () => {
            const response = await fetch(resourceUrl);
            if (response.ok) {
                const data = JSON.parse(await response.text());
                setState(data);
            } else {
                setState({
                    name: 'string',
                    humidity: 'number',
                    temperature: 'number',
                    min: 'number',
                    max: 'number',
                    updated: 'Date',
                });
            }
        })();
    },
    [resourceUrl]);
    console.log('asdf', resourceName);
    return <>
        {React.Children.map(children, child => {
            if (React.isValidElement(child)) {
                return React.cloneElement(child, { [resourceName]: state });
            }
        })}
    </>;
};
