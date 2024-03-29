﻿using MaskedEmails.Inbox.Configuration;
using MaskedEmails.Inbox.Interop;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Net.Http;

namespace MaskedEmails.Inbox.Http
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddInboxApi(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddTransient<IRequestToken, RequestToken>();
            services.AddTransient<AuthenticatedParameterizedHttpClientHandler>();

            var inboxApiSettings = new InboxApiSettings();
            var inboxApiSettingsSection = configuration.GetSection("InboxApi");
            inboxApiSettingsSection.Bind(inboxApiSettings);

            services.Configure<InboxApiSettings>(inboxApiSettingsSection);

            var authHttpBuilder = services
                .AddHttpClient("inbox-api-oauth", NewMethod(inboxApiSettings))
                ;

            services
                .AddHttpClient("inbox-api", c =>
                {
                    c.BaseAddress = new Uri(inboxApiSettings.Endpoint);
                })
                .AddTypedClient(c => Refit.RestService.For<IInboxApi>(c))
                .AddHttpMessageHandler<AuthenticatedParameterizedHttpClientHandler>()
                ;

            return services;
        }

        private static Action<HttpClient> NewMethod(InboxApiSettings inboxApiSettings)
        {
            return c =>
            {
                c.BaseAddress = new Uri(inboxApiSettings.Authority);
            };
        }
    }
}
